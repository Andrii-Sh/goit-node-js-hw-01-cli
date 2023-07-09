import contactsServise from "./contacts.js";
import { program } from "commander";

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const allContacts = await contactsServise.listContacts();
      console.table(allContacts);
      break;

    case "get":
      const searchContact = await contactsServise.getContactById(id);
      console.log(searchContact);

      break;

    case "add":
      const newContact = await contactsServise.addContact(name, email, phone);
      console.log(newContact);
      break;

    case "remove":
      const removeContact = await contactsServise.removeContact(id);
      console.log(removeContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
