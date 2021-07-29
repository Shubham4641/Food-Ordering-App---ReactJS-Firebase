import classes from './Checkout.module.css';
import {useRef, useState} from 'react';
 
const Checkout = (props) => {

    const [formInputValidity, setFormInputValidity] = useState({
        name: true,
        street: true,
        city: true,
        postalCode: true,


    });

    const isEmpty = (value) => value.trim() === '';
    const isFiveChars = (value) => value.trim().length === 5;

    const nameInputRef = useRef();
    const streetInputRef = useRef();
    const postalCodeInputRef = useRef();
    const cityInputRef = useRef();


  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredSteet = streetInputRef.current.value;
    const enteredPostalCode = postalCodeInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredSteet);
    const enteredCityIsValid = !isEmpty(enteredCity);
    const enteredPostalCodeIsValid = isFiveChars(enteredPostalCode);

    setFormInputValidity({
        name: enteredNameIsValid,
        street: enteredStreetIsValid,
        city: enteredCityIsValid,
        postalCode:enteredPostalCodeIsValid,
    });

    const formIsValid =
     enteredNameIsValid && 
     enteredStreetIsValid &&
      enteredPostalCodeIsValid && 
      enteredCityIsValid;

    if(!formIsValid) {
        return;
    }
    props.onConfirm({
        name:enteredName,
        street:enteredSteet,
        postalCode:enteredPostalCode,
        city:enteredCity,
    });
  };

  const nameControlClasses =`${classes.control} ${formInputValidity.name ? '' : classes.invalid}`;
  const streetControlClasses =`${classes.control} ${formInputValidity.street ? '' : classes.invalid}`;
  const postalCodeControlClasses =`${classes.control} ${formInputValidity.postalCode ? '' : classes.invalid}`;
  const cityControlClasses =`${classes.control} ${formInputValidity.city ? '' : classes.invalid}`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' ref={nameInputRef}/>
      </div>
      {!formInputValidity.name && <p>Please Enter A Valid Name</p>}


      <div className={streetControlClasses}>
        <label htmlFor='street'>Street</label>
        <input type='text' id='street' ref={streetInputRef}/>
       </div>
       {!formInputValidity.street && <p>Please Enter A Valid Street</p>}

      <div className={postalCodeControlClasses}>
        <label htmlFor='postal'>Postal Code</label>
        <input type='text' id='postal' ref={postalCodeInputRef}/>
      </div>
      {!formInputValidity.postal && <p>Please Enter A Valid Postal Code</p>}

      <div className={cityControlClasses}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city' ref={cityInputRef} />
      </div>
      {!formInputValidity.city && <p>Please Enter A Valid City Name</p>}

      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;