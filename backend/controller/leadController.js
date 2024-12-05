
const Lead = require('../models/Lead');
const User = require('../models/Users');

const createLead = async (req, res) => {
 
    const { title, name, price ,userId} = req.body;

    try {
        const lead = new Lead({ title, name, price,  createdBy: userId });///lead wale table mei saved 

        await lead.save();
   // Update the user's leads array
   //and also push the lead id in User object lead key find Id and update 
   await User.findByIdAndUpdate(userId, { $push: { leads: lead._id } });
   res.status(201).json({ message: 'Lead created successfully', lead: lead });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all leads for a specific books
const getLead = async (req, res) => {
    const { id } = req.params;

  try {
    // Find all leads for the user
    const user = await User.findById(id).populate('leads');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ leads: user.leads });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getSpecificLead = async (req, res) => {
    const { id } = req.params;

  try {
    // Find all Books for the Specific user
    const LeadData = await Lead.findById(id);

    if (!LeadData) {
      return res.status(404).json({ error: 'LeadData not found' });
    }

    res.status(200).json({ leads: LeadData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const updateLead = async (req, res) => {
    const { id } = req.params;
    console.log(req.body)
    const updates = req.body;

    try {
        const lead = await Lead.findByIdAndUpdate(id, updates, { new: true });

        if (!lead) {
            return res.status(404).json({ error: 'Lead not found' });
        }

        res.status(200).json({ lead });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteLead = async (req, res) => {
    const { id } = req.params;

    try {
        const lead = await Lead.findByIdAndDelete(id);///only gives id 

        if (!lead) {
            return res.status(404).json({ error: 'Lead not found' });
        }
          // Remove the lead reference from the user's leads array ///pulll means remove
    await User.findByIdAndUpdate(lead.createdBy, { $pull: { leads: id } });


        res.status(200).json({ message: 'Lead deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const sortLeads = async (req, res) => {
    const { userId } = req.params;
    const { sortBy } = req.query; // sortBy could be 'asc' or 'desc'

    try {
        const sortOrder = sortBy === 'asc' ? 1 : -1;///forntend se hmne string passs ki asc or des and as per this ternary operatiors used
        

        const leads = await Lead.find({ createdBy: userId }).sort({ name: sortOrder });

        res.status(200).json({ leads });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {getSpecificLead, createLead,getLead, updateLead, deleteLead, sortLeads };
