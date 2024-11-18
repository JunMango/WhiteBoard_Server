import express from 'express';
import MongoDbClient from "../../db/mongoDb.js";
const testRouter = express.Router();

testRouter.get('/hello', (req, res) => {
    console.log("/api/test Call=>");
    res.status(200).json({ message: "hello world", status: "200" });
});

testRouter.post('/insert', async (req, res) => {
    const body = req.body; // 클라이언트에서 전송된 데이터를 받습니다.

    if (!body || Object.keys(body).length === 0) {
        return res.status(400).json({ message: 'No data provided', status: '400' });
    }

    try {
        // MongoDB 연결
        await MongoDbClient.connect();
        const db = MongoDbClient.db('testDB'); // 'testDB'는 데이터베이스 이름, 원하는 이름으로 변경하세요.
        const collection = db.collection('testCollection'); // 'testCollection'은 컬렉션 이름

        // 데이터 삽입
        const result = await collection.insertOne(body);

        res.status(200).json({
            message: 'Data inserted successfully',
            insertedId: result.insertedId,
            status: '200',
        });
    } catch (error) {
        console.error('Error inserting data:', error);
        res.status(500).json({ message: 'Internal Server Error', status: '500' });
    } finally {
        // 연결 종료
        await MongoDbClient.close();
    }
});

export default testRouter;
