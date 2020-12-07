const express = require('express');
const router = express.Router();
const Sensor = require('../models/Sensor');
const moment = require('moment');
const auth = require('../middlewares/auth');

router.get('/', auth(['customer', 'admin']), async (req, res) => {
    try {
        console.log(req.query.begin);
        console.log(req.query.end);
        //ngày bắt đầu
        let datebegin = moment(Number.parseInt(req.query.begin));
        //ngày kết thúc
        let dateend = moment(Number.parseInt(req.query.end));
        //tính khoảng cách hai mốc thời gian
        let start = datebegin.valueOf();
        let end = dateend.valueOf();
        let range = end - start;
        let miniRange = range / 20; //20 khoảng thời gian

        //lấy thông tin theo các mốc thời gian
        const rs = await Sensor.find({
            createdDate: {
                $gte: datebegin.get('time'),
                $lte: dateend.get('time'),
            },
        }).sort({ field: 'asc', _id: -1 });
        //Biến lưu danh sách kết quả trung bình, kết quả trung bình chia làm 20 khoảng
        var result = [];
        for (let i = start; i < end; i += miniRange) {
            let value = {
                humidityLand: 0,
                humidityAir: 0,
                temperature: 0,
                time: i,
            };

            //biến lưu số bản ghi trong một khoảng thời gian
            let count = 0;
            let arr = rs.filter((obj) => {
                return (
                    moment(obj.createdDate).valueOf() > i &&
                    moment(obj.createdDate).valueOf() < i + miniRange
                );
            });
            if (Array.isArray(arr) && arr.length) {
                arr.forEach((item, index) => {
                    if (item && item !== 'null' && item !== 'undefined') {
                        value.humidityLand += item.humidityLand;
                        value.humidityAir += item.humidityAir;
                        value.temperature += item.temperature;
                        count++;
                    }
                });
            }
            //nếu trong khoảnh thời gian không có bản ghi nào thì count = 0 => 0/0 = null;
            if (count != 0) {
                value.humidityLand = value.humidityLand / count;
                value.humidityAir = value.humidityAir / count;
                value.temperature = value.temperature / count;
            }
            result.push(value);
        }
        return res.json(result);
    } catch (error) {
        res.status(400).json({ message: err.message });
    }
});

router.post('/getdata', async (req, res) => {
    try {
        //request body
        const begin_month = req.body.begin_month;
        const begin_day = req.body.begin_day;
        const begin_hour = req.body.begin_hour;
        const begin_minute = req.body.begin_minute;
        const end_month = req.body.end_month;
        const end_day = req.body.end_day;
        const end_hour = req.body.end_hour;
        const end_minute = req.body.end_minute;
        //ngày bắt đầu
        let datebegin = moment({
            month: begin_month,
            date: begin_day,
            hour: begin_hour,
            minute: begin_minute,
        });
        //ngày kết thúc
        let dateend = moment({
            month: end_month,
            date: end_day,
            hour: end_hour,
            minute: end_minute,
        });
        //tính khoảng cách hai mốc thời gian
        let start = datebegin.valueOf();
        let end = dateend.valueOf();
        let range = end - start;
        let miniRange = range / 20; //20 khoảng thời gian

        //lấy thông tin theo các mốc thời gian
        const rs = await Sensor.find({
            createdDate: {
                $gte: datebegin.get('time'),
                $lte: dateend.get('time'),
            },
        }).sort({ field: 'asc', _id: -1 });
        //Biến lưu danh sách kết quả trung bình, kết quả trung bình chia làm 20 khoảng
        var result = [];
        for (let i = start; i < end; i += miniRange) {
            let value = {
                humidityLand: 0,
                humidityAir: 0,
                temperature: 0,
            };

            //biến lưu số bản ghi trong một khoảng thời gian
            let count = 0;
            let arr = rs.filter((obj) => {
                return (
                    moment(obj.createdDate).valueOf() > i &&
                    moment(obj.createdDate).valueOf() < i + miniRange
                );
            });
            if (Array.isArray(arr) && arr.length) {
                arr.forEach((item, index) => {
                    if (item && item !== 'null' && item !== 'undefined') {
                        value.humidityLand += item.humidityLand;
                        value.humidityAir += item.humidityAir;
                        value.temperature += item.temperature;
                        count++;
                    }
                });
            }
            //nếu trong khoảnh thời gian không có bản ghi nào thì count = 0 => 0/0 = null;
            if (count != 0) {
                value.humidityLand = value.humidityLand / count;
                value.humidityAir = value.humidityAir / count;
                value.temperature = value.temperature / count;
            }
            result.push(value);
        }
        return res.json(result);
    } catch (error) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
