
const { listContacts, getContactById, removeContact, addContact, exportContacts } = require('./contacts');

const argv = require('yargs').argv;

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      listContacts().then(console.table);
      break;

    case 'get':
      getContactById(id).then(console.log);
      break;

    case 'add':
      addContact(name, email, phone).then(console.log);
      break;

    case 'remove':
      removeContact(id).then(console.log);
      break;

    case 'export':
      exportContacts();
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);
