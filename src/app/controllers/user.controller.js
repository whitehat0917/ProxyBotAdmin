var AdminModel = require('../models/admin.model');
var HistoryModel = require('../models/history.model');
const request = require("request");
const config = require("../config/auth.config");

exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
};

exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
};

exports.getDashboardData = (req, res) => {
    var responseData = {};
    history = new HistoryModel();
    history.query("select IFNULL(sum(amount), 0) as amount from history", function(err, rows, fields) {
        if (rows.length == 0) {
            responseData.total_price = 0;
        } else {
            responseData.total_price = rows[0].amount;
        }
        history.query('select sum(amount) amount, DATE_FORMAT(created_at,"%b") month from history where DATE_FORMAT(created_at,"%Y") = DATE_FORMAT(NOW(),"%Y") group by DATE_FORMAT(created_at, "%b") order by DATE_FORMAT(created_at, "%m")', function(err, rows, fields) {
            if (err) {
                responseData.price_list = [];
            } else {
                responseData.price_list = rows;
            }
            const url = "http://" + config.squidAddress + "/api/users/getDashboardData";
            request.post(url, (error, response, body) => {
                if (error != null) {
                    responseData.proxy_count = 0;
                    responseData.user_count = 0;
                    responseData.ip_count = 0;
                    res.status(200).send({ status: "success", data: responseData });
                    return;
                }
                if (JSON.parse(body).status == "No error") {
                    const data = JSON.parse(body).data;
                    responseData.proxy_count = data.proxy_count;
                    responseData.user_count = data.user_count;
                    responseData.ip_count = data.ip_count;
                } else {
                    responseData.proxy_count = 0;
                    responseData.user_count = 0;
                    responseData.ip_count = 0;
                }
                res.status(200).send({ status: "success", data: responseData });
                return;
            });
        });
    });
};

exports.getAvailableIpList = (req, res) => {
    const url = "http://" + config.squidAddress + "/api/users/showAvailableProxies";
    request.post(url, (error, response, body) => {
        if (error != null) {
            res.status(200).send({ status: "error" });
            return;
        }
        if (JSON.parse(body).status == "No data") {
            res.status(200).send({ status: "nodata" });
        } else {
            const data = JSON.parse(body).data;
            res.status(200).send({ status: "success", data: data });
        }
    });
};

exports.addIp = (req, res) => {
    const options = {
        url: 'http://' + config.squidAddress + '/api/users/addIp',
        json: true,
        body: {
            startIp: req.body.startIp,
            count: req.body.count,
            subnet: req.body.subnet
        }
    };
    request.post(options, (error, response, body) => {
        if (error != null) {
            console.log(error);
            res.status(200).send({ status: "error" });
            return;
        }
        if (body.status == "No error") {
            res.status(200).send({ status: "success" });
            return;
        }
    });
};

exports.deleteIp = (req, res) => {
    const options = {
        url: 'http://' + config.squidAddress + '/api/users/deleteIp',
        json: true,
        body: {
            startIp: req.body.startIp,
            count: req.body.count,
            subnet: req.body.subnet
        }
    };
    request.post(options, (error, response, body) => {
        if (error != null) {
            console.log(error);
            res.status(200).send({ status: "error" });
            return;
        }
        if (body.status == "No error") {
            res.status(200).send({ status: "success" });
            return;
        }
    });
};

exports.getProxyHistory = (req, res) => {
    history = new HistoryModel();
    history.find('all', function(err, rows) {
        if (rows.length == 0) {
            return res.status(200).send({ status: "error" });
        } else {
            return res.status(200).send({ status: "success", data: rows });
        }
    });
};

exports.setMaxIp = (req, res) => {
    const options = {
        url: 'http://' + config.squidAddress + '/api/users/changeMulti',
        json: true,
        body: {
            count: req.body.count
        }
    };
    request.post(options, (error, response, body) => {
        console.log(body.status);
        if (error != null) {
            console.log(error);
            res.status(200).send({ status: "error" });
            return;
        }
        if (body.status == "No error") {
            res.status(200).send({ status: "success" });
            return;
        } else {
            res.status(200).send({ status: body.status });
            return;
        }
    });
};

exports.getUsedProxy = (req, res) => {
    const url = "http://" + config.squidAddress + "/api/users/showProxies";
    request.post(url, (error, response, body) => {
        if (error != null) {
            res.status(200).send({ status: "error" });
            return;
        }
        if (JSON.parse(body).status == "No data") {
            res.status(200).send({ status: "nodata" });
        } else if (JSON.parse(body).status == "No error") {
            const data = JSON.parse(body).data;
            res.status(200).send({ status: "success", data: data });
        }
    });
};

exports.getUsers = (req, res) => {
    const url = "http://" + config.squidAddress + "/api/users/getUsers";
    request.post(url, (error, response, body) => {
        if (error != null) {
            res.status(200).send({ status: "error" });
            return;
        }
        if (JSON.parse(body).status == "No error") {
            const data = JSON.parse(body).data;
            res.status(200).send({ status: "success", data: data });
        } else {
            res.status(200).send({ status: JSON.parse(body).status });
        }
    });
};

exports.getUserProxy = (req, res) => {
    const options = {
        url: 'http://' + config.squidAddress + '/api/users/showUserProxy',
        json: true,
        body: {
            id: req.body.userid
        }
    };
    request.post(options, (error, response, body) => {
        if (error != null) {
            console.log(error);
            res.status(200).send({ status: "error" });
            return;
        }
        if (body.status == "No error") {
            res.status(200).send({ status: "success", data: body.data });
            return;
        } else {
            res.status(200).send({ status: body.status });
            return;
        }
    });
};

exports.addUserProxy = (req, res) => {
    const options = {
        url: 'http://' + config.squidAddress + '/api/users/setProxy',
        json: true,
        body: {
            userid: req.body.userid,
            port: req.body.port,
            count: 1,
            days: req.body.days
        }
    };
    request.post(options, (error, response, body) => {
        if (error != null) {
            console.log(error);
            res.status(200).send({ status: "error" });
            return;
        }
        if (body.status == "No error") {
            res.status(200).send({ status: "success" });
            return;
        } else {
            res.status(200).send({ status: body.status });
            return;
        }
    });
};

exports.editUserProxy = (req, res) => {
    const options = {
        url: 'http://' + config.squidAddress + '/api/users/editProxy',
        json: true,
        body: {
            id: req.body.id,
            port: req.body.port,
            days: req.body.days
        }
    };
    request.post(options, (error, response, body) => {
        if (error != null) {
            console.log(error);
            res.status(200).send({ status: "error" });
            return;
        }
        if (body.status == "No error") {
            res.status(200).send({ status: "success" });
            return;
        } else {
            res.status(200).send({ status: body.status });
            return;
        }
    });
};

exports.deleteUserProxy = (req, res) => {
    const options = {
        url: 'http://' + config.squidAddress + '/api/users/deleteProxy',
        json: true,
        body: {
            id: req.body.id,
        }
    };
    request.post(options, (error, response, body) => {
        if (error != null) {
            console.log(error);
            res.status(200).send({ status: "error" });
            return;
        }
        if (body.status == "No error") {
            res.status(200).send({ status: "success" });
            return;
        } else {
            res.status(200).send({ status: body.status });
            return;
        }
    });
};

exports.addUser = (req, res) => {
    const options = {
        url: 'http://' + config.squidAddress + '/api/users/addUser',
        json: true,
        body: {
            username: req.body.username,
            password: req.body.password
        }
    };
    request.post(options, (error, response, body) => {
        if (error != null) {
            console.log(error);
            res.status(200).send({ status: "error" });
            return;
        }
        if (body.status == "No error") {
            res.status(200).send({ status: "success" });
            return;
        } else {
            res.status(200).send({ status: body.status });
            return;
        }
    });
};

exports.deleteUser = (req, res) => {
    const options = {
        url: 'http://' + config.squidAddress + '/api/users/deleteUser',
        json: true,
        body: {
            userid: req.body.userid
        }
    };
    request.post(options, (error, response, body) => {
        if (error != null) {
            console.log(error);
            res.status(200).send({ status: "error" });
            return;
        }
        if (body.status == "No error") {
            res.status(200).send({ status: "success" });
            return;
        } else {
            res.status(200).send({ status: body.status });
            return;
        }
    });
};

exports.getBlacklist = (req, res) => {
    const url = "http://" + config.squidAddress + "/api/users/showBlacklist";
    request.post(url, (error, response, body) => {
        if (error != null) {
            res.status(200).send({ status: "error" });
            return;
        }
        if (JSON.parse(body).status == "No error") {
            const data = JSON.parse(body).data;
            res.status(200).send({ status: "success", data: data });
        } else {
            res.status(200).send({
                status: JSON.parse(body).status,
                data: []
            });
        }
    });
};

exports.addBlacklist = (req, res) => {
    const options = {
        url: 'http://' + config.squidAddress + '/api/users/addBlacklist',
        json: true,
        body: {
            url: req.body.url
        }
    };
    request.post(options, (error, response, body) => {
        if (error != null) {
            console.log(error);
            res.status(200).send({ status: "error" });
            return;
        }
        if (body.status == "No error") {
            res.status(200).send({ status: "success" });
            return;
        } else {
            res.status(200).send({ status: body.status });
            return;
        }
    });
};

exports.editBlacklist = (req, res) => {
    const options = {
        url: 'http://' + config.squidAddress + '/api/users/editBlacklist',
        json: true,
        body: {
            id: req.body.id,
            url: req.body.url
        }
    };
    request.post(options, (error, response, body) => {
        if (error != null) {
            console.log(error);
            res.status(200).send({ status: "error" });
            return;
        }
        if (body.status == "No error") {
            res.status(200).send({ status: "success" });
            return;
        } else {
            res.status(200).send({ status: body.status });
            return;
        }
    });
};

exports.deleteBlacklist = (req, res) => {
    const options = {
        url: 'http://' + config.squidAddress + '/api/users/deleteBlacklist',
        json: true,
        body: {
            url: req.body.url
        }
    };
    request.post(options, (error, response, body) => {
        if (error != null) {
            console.log(error);
            res.status(200).send({ status: "error" });
            return;
        }
        if (body.status == "No error") {
            res.status(200).send({ status: "success" });
            return;
        } else {
            res.status(200).send({ status: body.status });
            return;
        }
    });
};