import Contact from "./Contact";

const ContactList = ({personsToShow, deletePerson}) => {
  return (
    <div>
      <h2>Numbers</h2>
      {personsToShow.map(p => <Contact key={p.id} person={p} deletePerson={() => deletePerson(p.id)}/>)}
    </div>
  )
}

export default ContactList;