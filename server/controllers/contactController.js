

const contact = {
  //@desc Get all contacts
  //@route GET /api/contacts
  //@access public
  getContact: (req, res) => {
    res.status(200).json({ message: "Get all contacts" });
  },
  //@desc Create New contact
  //@route POST /api/contacts
  //@access public
  createContact: (req, res) => {
    res.status(201).json({ message: "Create Contact" });
  },

  //@desc Edit a contact
  //@route PUT:ID /api/contacts/id
  //@access public
  putIDContact: (req, res) => {
    res.status(200).json({ message: `Update Contact for ${req.params.id}` });
  },
  //@desc Get a contact
  //@route GET:ID /api/contacts/id
  //@access public
  getIDContact: (req, res) => {
    res.status(200).json({ message: `Get Contact of ${req.params.id}` });
    },
   //@desc Delete a contact
  //@route DELETE:ID /api/contacts/id
    //@access public
  deleteIDContact: (req, res) => {
    res.status(200).json({ message: `Delete Contact of ${req.params.id}` });
  }
};

module.exports = contact;
