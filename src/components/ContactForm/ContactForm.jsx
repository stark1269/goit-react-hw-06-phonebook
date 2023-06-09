import { Formik } from 'formik';
import { Form, Label, Input, Button, Error } from './ContactForm.styled';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { addContact } from 'redux/contactsSlice';

const Schema = Yup.object({
  name: Yup.string().required('Required')
    .matches(/(^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$)/, 'Invalid by name'),
  number: Yup.string().required('Required')
    .matches(/(\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9})/, 'Invalid by number'),
});

export const ContactForm = () => {
  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={
        {
          name: '',
          number: '',
        }
    }
      validationSchema={Schema}
      onSubmit={(values, actions) => {
        dispatch(addContact(values));
        actions.resetForm();
      }
    }
    >
    <Form>
      <Label>Name
        <Input name="name" />
        <Error name="name" component="div"/>
      </Label>
      <Label>Number
        <Input name="number" type="tel" />
        <Error name="number" component="div"/>
      </Label>
      <Button type="submit">Add contact</Button>
    </Form>
    </Formik>
  )
};