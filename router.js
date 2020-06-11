const express = require('express');
const router = express.Router();
const AccountsDB = require('./data/accountsDB.js');

router.get('/', (req, res) => {
    AccountsDB.get().then(response => {
        res.status(200).json(response);
    }).catch(err => {
        console.log(err);
        res.status(500).json({err: "Sorry. The server experienced an error."});
    });
});

router.get('/:id', (req, res) => {
    const {id} = req.params;
    AccountsDB.getById(id).then(response => {
        if (response) {
            res.status(200).json(response);
        } else {
            res.status(404).json({err: "The account with the specified ID does not exist."})
        }
    }).catch(err => {
        console.log(err);
        res.status(500).json({err: "Sorry. The server experienced an error."});
    });
});

router.post('/', (req, res) => {
    const account = req.body;
    if (!(account.name && account.budget)) {
        res.status(400).json({err: "Account is missing name and/or budget."});
    } else {
        AccountsDB.insert(account).then(response => {
            res.status(201).json(response);
        }).catch(err => {
            console.log(err);
            res.status(500).json({err: "Sorry. The server experienced an error."});
        });
    }
});

router.put('/:id', (req, res) => {
    const {id} = req.params;
    const account = req.body;
    if (!(account.name && account.budget)) {
        res.status(400).json({err: "Account is missing name and/or budget."});
    } else {
        AccountsDB.update(id, account).then(response => {
            if (response) {
                res.status(200).json(response);
            } else {
                res.status(404).json({err: "The account with the specified ID does not exist."})
            }
        }).catch(err => {
            console.log(err);
            res.status(500).json({err: "Sorry. The server experienced an error."});
        });
    }
});

router.delete('/:id', (req, res) => {
    const {id} = req.params;
    AccountsDB.remove(id).then(response => {
        if (response) {
            res.status(200).json(response);
        } else {
            res.status(404).json({err: "The account with the specified ID does not exist."})
        }
    }).catch(err => {
        console.log(err);
        res.status(500).json({err: "Sorry. The server experienced an error."});
    });
});
module.exports = router;