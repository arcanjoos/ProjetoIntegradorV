import React from 'react'
import './Form.css';
import { Field, Form, Formik } from 'formik';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Formulario() {

  const notify = () => toast.success("Em breve um dos nossos representantes entrará em contato!");

  const submit = (values) => {
    const { email, nome } = values
    console.log(email)
    console.log(nome)

    console.log('submit')
    notify()
  }
  return (
    <div className="contato__container">
      <h1>Entre em contato e solicite um orçamento!</h1>

      <Formik
        initialValues={{ email: '', nome: '' }}
        onSubmit={(values, actions) => {
          submit(values)

        }}
      >
        <Form>
          <div className="contato__item__container">
            <Field className="contato__item" type="text" name="nome" placeholder="Nome" />
            <br />
          </div>
          <div className="contato__item__container">
            <Field className="contato__item" type="email" name="email" placeholder="Email" />
            <br />
          </div>
          <div className="contato__item__container">
            <button className="contato__item" type="submit">SOLICITAR ORÇAMENTO</button>
          </div>
        </Form>

      </Formik>
      <ToastContainer />
    </div>
  )
}

export default Formulario
