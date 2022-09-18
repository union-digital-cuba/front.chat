const HelperFunction = {
  handleChange: (event, currentState, setState) => {
    setState({ ...currentState, [event.target.name]: event.target.value })
  },
  handleValidationRequired: (text) => {
    return !!text
  },
  EmailValidate: (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
  },
}

export { HelperFunction }
