/*  Tommi Ralli
    Fullstack Open 2020 */

import React, { useState, useEffect } from "react";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import numberService from "./services/numbers";
import Notification from "./components/Notification";

const App = () => {

  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [luokka, setLuokka] = useState("success");

  /*setTimeout(() => {
    console.log('loop..')
    let i = 0
    while (i < 500000000000) {
      i++
    }
    console.log('end')
  }, 5000)*/

  /*numberService
    .update(id)
    .then(response => {
      setPersons(persons.map(persons => persons.id !== id ? persons : response.data))
    })*/

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value);
  };

  const handleDeleteNumber = (name, id) => {
    return () => {
      if (window.confirm(`Remove ${name} ?`)) {
        numberService
          .deletePerson(id)
          .then(() => {
            setPersons(persons.filter(n => n.id !== id));
            setLuokka("success");
            setErrorMessage(`${name} removed.`);
            setTimeout(() => {
              setErrorMessage(null);
              }, 5000);
            setNewName("");
            setNewNumber("");
          })
          .catch(error => {
            setPersons(persons.filter(n => n.name !== name));
            setLuokka("error")
            setErrorMessage(`${name} is already removed.`);
            setTimeout(() => {
              setErrorMessage(null);
              }, 5000);
          });
        
      }
    };
  };
  

  useEffect(() => {
    numberService
      .getAll()
      .then(response => {
        setPersons(response);
        
      })
      .catch(error => {
        console.log('fails')
      });
  }, [])
  
  const AddName = event => {
    event.preventDefault();

    const personObject = {
      name: newName,
      number: newNumber,
      id: Math.floor(Math.random() * 1001)
    };

    if (
      persons.filter(person => person.name === personObject.name).length > 0
    ) {
      if (
        window.confirm(
          `${
            personObject.name
          } is already in the phonebook, do you want to replace the old number with new?`
        )
      ) {
        const previousPerson = persons.find(n => n.name === newName);
        numberService
          .update(previousPerson.id, { ...previousPerson, number: newNumber })
          .then(updatedPerson => {
            setPersons(
              persons.map(n => (n.name === newName ? updatedPerson : n))
            );
          })
          .catch(error => {
            console.log(error);
            setLuokka("error")
            setErrorMessage("Update failed.");
            setTimeout(() => {
              setErrorMessage(null);
              }, 5000);
          });
        setPersons(persons.concat(personObject));
        setLuokka("success");
        setErrorMessage(`Number of  ${personObject.name} is changed.`);
        setNewName("");
        setNewNumber("");
        setTimeout(() => {
        setErrorMessage(null);
        }, 5000);
      }
    } else {
      numberService
        .create(personObject)
        .then(newPerson => {
          setPersons(persons.concat(newPerson));
          setLuokka("success");
          setErrorMessage(`${personObject.name} added.`);
          setNewName("");
          setNewNumber("");
        })
        .catch(error => {
          setLuokka("error");
          setErrorMessage(`${error.response.data.error}`);
          console.log(error.response.data);
        });
      setTimeout(() => {
      setErrorMessage(null);
      }, 5000);
    }
  };

  const amount = () => {
    return (persons.length)
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />  
      
      <Notification message={errorMessage} luokka={luokka} />
      
      <h2>Add new</h2>
      <PersonForm
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        AddName={AddName}
        newName={newName}
        newNumber={newNumber}
      />

  <h2>Numbers ({amount()})</h2>
        <Persons
          persons={persons}
          newFilter={newFilter}
          handleDeleteNumber={handleDeleteNumber}
        />
        
    </div>
  );
};

export default App;
