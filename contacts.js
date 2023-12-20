const fs = require('fs/promises');
const path = require('path');

const contactsPath = path.join(__dirname, 'db', 'contacts.json');

async function readContacts() {
    try {
      const data = await fs.readFile(contactsPath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      if (error.code === 'ENOENT') {
        return [];
      }
      throw error;
    }
  }

async function writeContacts(contacts) {
 await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  }

async function listContacts() {
  return await readContacts();
}

async function getContactById(contactId) {
  const contacts = await readContacts();
  return contacts.find((c) => c.id === contactId) || null;
}

async function removeContact(contactId) {
  const contacts = await readContacts();
  const contactIndex = contacts.findIndex((c) => c.id === contactId);

  if (contactIndex === -1) {
    console.log(`Contact with id ${contactId} not found.`);
    return null;
  }

  const [removedContact] = contacts.splice(contactIndex, 1);
  await writeContacts(contacts);

  console.log(`Contact with id ${contactId} removed successfully.`);
  return removedContact;
}

async function addContact(name, email, phone) {
  const newContact = { id: Date.now().toString(), name, email, phone };
  const contacts = await readContacts();
  contacts.push(newContact);

  await writeContacts(contacts);

  console.log(`Contact added successfully: ${JSON.stringify(newContact, null, 2)}`);
  return newContact;
}

module.exports = { listContacts, getContactById, removeContact, addContact, writeContacts };
