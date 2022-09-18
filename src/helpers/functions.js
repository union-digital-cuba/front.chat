const HelperFunction = {
  handleChange: (event, currentState, setState) => {
    setState({ ...currentState, [event.target.name]: event.target.value })
  },
  handleValidationRequired: (text) => {
    console.log(!!text)
    return !!text
  },
}

export { HelperFunction }
