import { addDoc, collection, deleteDoc, doc, getDocs } from 'firebase/firestore'
import { FormEvent, useEffect, useRef, useState } from 'react'
import db from './firebase'
import { firstNamesExamples } from './libs/Arrays'

interface Doc {
  id: string
  name: string
  gender?: string
  nationality: string
}

export default function Home() {
  const [page, setPage] = useState('')

  const [name, setName] = useState('')
  const [genderName, setGenderName] = useState('')
  const [nacionalityName, setNacionalityName] = useState('')

  const [surname, setSurname] = useState('')
  const [nationalitySurname, setNationalitySurname] = useState('')

  const inputRefName = useRef<HTMLInputElement>(null)
  const inputRefSurname = useRef<HTMLInputElement>(null)

  const [namesList, setNamesList] = useState<Doc[]>([])
  const [surnamesList, setSurnamesList] = useState<Doc[]>([])

  async function GetDocs(collec: string) {
    await getDocs(collection(db, collec)).then((querySnapshot) => {
      const list: Doc[] = []

      querySnapshot.forEach((doc) => {
        // console.log('name', doc.data().name)
        // namesList.forEach((item) => {
        //   if (item.name === doc.data().name) {
        //     console.log('delete', item)
        //   }
        // DeleteDoc(collec, doc.id)
        // })

        if (
          doc.data().name === '' &&
          doc.data().gender === '' &&
          doc.data().nationality === ''
        ) {
          DeleteDoc(collec, doc.id)
        } else {
          if (collec === 'first-name') {
            list.push({
              id: doc.id,
              name: doc.data().name,
              nationality: doc.data().nationality,
              gender: doc.data().gender,
            })
          }

          if (collec === 'last-name') {
            list.push({
              id: doc.id,
              name: doc.data().name,
              nationality: doc.data().nationality,
            })
          }
        }
      })

      list.sort((a, b) => a.name.localeCompare(b.name))

      if (collec === 'first-name') setNamesList(list)
      if (collec === 'last-name') setSurnamesList(list)
    })
  }

  async function DeleteDoc(collec: string, docId: string) {
    await deleteDoc(doc(db, collec, docId))
  }

  async function AddName(e: FormEvent) {
    e.preventDefault()

    try {
      await addDoc(collection(db, 'first-name'), {
        name,
        gender: genderName.toLowerCase(),
        nationality: nacionalityName,
      })

      setName('')
      setGenderName('')
      setNacionalityName('')

      await GetDocs('first-name')

      if (inputRefName.current) {
        inputRefName.current.focus()
      }
    } catch (err) {
      console.error('Erro ao adicionar um documento: ', err)
    }
  }

  async function AddNames(name: string, gender: string, nationality: string) {
    try {
      await addDoc(collection(db, 'first-name'), {
        name,
        gender: gender.toLowerCase(),
        nationality,
      })

      await GetDocs('first-name')
    } catch (err) {
      console.error('Erro ao adicionar um documento: ', err)
    }
  }

  async function AddSurnames(name: string, nationality: string) {
    try {
      await addDoc(collection(db, 'last-name'), {
        name,
        nationality,
      })

      await GetDocs('last-name')
    } catch (err) {
      console.error('Erro ao adicionar um documento: ', err)
    }
  }

  async function AddSurname(e: FormEvent) {
    e.preventDefault()

    try {
      await addDoc(collection(db, 'last-name'), {
        surname,
        nacionality: nationalitySurname,
      })

      setSurname('')
      setNationalitySurname('')

      await GetDocs('last-name')

      if (inputRefSurname.current) {
        inputRefSurname.current.focus()
      }
    } catch (err) {
      console.error('Erro ao adicionar um documento: ', err)
    }
  }

  useEffect(() => {
    async function fetchData() {
      // await GetDocs('first-name')
      // await GetDocs('last-name')
      // if (namesList.length === 0) {
      //   firstNames.forEach((doc) => {
      //     AddNames(doc.name, doc.gender, doc.nationality)
      //   })
      // }
      // if (surnamesList.length === 0) {
      //   lastNames.forEach((doc) => {
      //     AddSurnames(doc.name, doc.nationality)
      //   })
      // }

      const list = firstNamesExamples

      list.sort((a, b) => a.name.localeCompare(b.name))

      for (let i = list.length - 1; i > 0; i--) {
        if (
          list[i].name === list[i - 1].name &&
          list[i].gender === list[i - 1].gender &&
          list[i].nationality === list[i - 1].nationality
        ) {
          list.splice(i, 1)
          // DeleteDoc('first-name', list[i].id)
        }
      }
    }
    fetchData()
  }, [false])

  function Principal() {
    return (
      <main className="flex gap-8 justify-center sm:flex-col  lg:w-screen lg:flex-row lg:flex-wrap">
        <div className="py-8 px-6 text-center bg-[#5f0c5f] border-b-[2px] border-b-[#b117d0] rounded-lg card">
          <h2 className="flex gap-4 justify-center items-center w-fit m-auto mb-7 text-[#dbacff] text-5xl">
            Nomes
          </h2>
          <ul className="flex flex-col gap-3 list-none w-[270px]">
            {namesList?.map((doc, id) => (
              <li key={id}>
                {doc.name} ({doc.gender}) ({doc.nationality})
              </li>
            ))}
          </ul>
        </div>

        <div className="py-8 px-6 text-center bg-[#5f0c5f] border-b-[2px] border-b-[#b117d0] rounded-lg card">
          <h2 className="flex gap-4 justify-center items-center w-fit m-auto mb-7 text-[#dbacff] text-5xl">
            Sobrenomes
          </h2>
          <ul className="flex flex-col gap-3 list-none w-[270px]">
            {surnamesList?.map((doc, id) => (
              <li key={id}>
                {doc.name} ({doc.nationality})
              </li>
            ))}
          </ul>
        </div>
      </main>
    )
  }

  function AddForms() {
    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.code === 'Space') {
        event.preventDefault()
      }
    }

    const handleKeyPressGender = (
      event: React.KeyboardEvent<HTMLInputElement>,
    ) => {
      if (
        event.key !== 'u' &&
        event.key !== 'f' &&
        event.key !== 'm' &&
        event.key !== 'ArrowLeft' &&
        event.key !== 'ArrowRight' &&
        event.key !== 'ArrowUp' &&
        event.key !== 'ArrowDown' &&
        event.key !== 'Delete' &&
        event.key !== 'Backspace' &&
        event.code !== 'Tab'
      ) {
        event.preventDefault()
      }
    }

    return (
      <main className="grid gap-8 justify-center w-[90vw] lg:grid-cols-2 sm:grid-cols-1">
        <div className="text-center">
          <h1 className="text-[2.5rem] mb-4 text-center">Adicionar Nome</h1>
          <form onSubmit={AddName} name="name" className="grid w-9/12 mx-auto">
            <input
              type="text"
              ref={inputRefName}
              placeholder="Primeiro Nome"
              className="text-black mx-8 px-4 py-2 my-4"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={handleKeyPress}
              required
            />

            <input
              type="text"
              placeholder="Gênero (u/f/m)"
              className="text-black mx-8 px-4 py-2 my-4"
              value={genderName}
              onChange={(e) => setGenderName(e.target.value.toLowerCase())}
              onKeyDown={handleKeyPressGender}
              maxLength={1}
              required
            />

            <input
              type="text"
              placeholder="Nacionalidade"
              className="text-black mx-8 px-4 py-2 my-4"
              value={nacionalityName}
              onChange={(e) => setNacionalityName(e.target.value)}
              onKeyDown={handleKeyPress}
              required
            />

            <button
              type="submit"
              className="my-4 py-4 px-6 mx-auto w-1/2 bg-zinc-700 text-white rounded cursor-pointer hover:bg-zinc-800"
            >
              Enviar
            </button>
          </form>
        </div>
        <div className="text-center">
          <h1 className="text-[2.5rem] mb-4 text-center">
            Adicionar Sobrenome
          </h1>
          <form
            onSubmit={AddSurname}
            name="surname"
            className="grid w-9/12 mx-auto"
          >
            <input
              type="text"
              ref={inputRefSurname}
              placeholder="Sobrenome"
              className="text-black mx-8 px-4 py-2 my-4"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              onKeyDown={handleKeyPress}
              required
            />

            <input
              type="text"
              placeholder="Nacionalidade"
              className="text-black mx-8 px-4 py-2 my-4"
              value={nationalitySurname}
              onChange={(e) => setNationalitySurname(e.target.value)}
              onKeyDown={handleKeyPress}
              required
            />

            <button
              type="submit"
              className="my-4 py-4 px-6 mx-auto w-1/2 bg-zinc-700 text-white rounded cursor-pointer hover:bg-zinc-800"
            >
              Enviar
            </button>
          </form>
        </div>
      </main>
    )
  }

  return (
    <div className="w-fit m-auto py-3">
      <header className="mb-4 text-center text-[5rem] cursor-default">
        <span
          onClick={() => {
            setPage('')
          }}
        >
          Lista
        </span>{' '}
        de{' '}
        <span
          onClick={() => {
            setPage('form')
          }}
        >
          Nomes
        </span>
      </header>
      {page === 'form' ? AddForms() : Principal()}
    </div>
  )
}
