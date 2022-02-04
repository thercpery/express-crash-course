const express = require("express");
const uuid = require("uuid");
const members = require("../../Members");
const router = express.Router();

// Get all members
router.get("/", (req, res) => res.send(members));

// Get single member
router.get("/:id", (req, res) => {
    // res.send(req.params.id);
    const found = members.some(member => member.id === parseInt(req.params.id));
    if(found){
        res.send(members.filter(member => member.id === parseInt(req.params.id)));
    }
    else{
        res.status(400).json(false);
    }
});

// Create a member
router.post("/", (req, res) => {
    const newMember = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        isActive: true
    };

    // If one of the values are blank
    if(!newMember.name || !newMember.email){
        return res.status(400).json(false);
    }
    
    members.push(newMember);

    // for api use
    return res.status(201).json(members);

    // for template use
    // res.redirect("/");
});

// Update member
router.put("/:id", (req, res) => {
    // res.send(req.params.id);
    const found = members.some(member => member.id === parseInt(req.params.id));
    if(found){
        const updateMember = req.body;
        members.forEach(member => {
            if(member.id === parseInt(req.params.id)){
                member.name = updateMember.name ? updateMember.name : member.name;
                member.email = updateMember.email ? updateMember.email : member.email;
                res.json({ msg: "member updated", member });
            }
        });
    }
    else{
        res.status(400).json(false);
    }
});

// Delete members
router.delete("/:id", (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));
    if(found){
        res.send({ msg: "Member deleted", members: members.filter(member => member.id !== parseInt(req.params.id)) });
    }
    else{
        res.status(400).json(false);
    }
});

module.exports = router;
