const HelperFunction = {
  handleChange: (event, currentState, setState) => {
    setState({ ...currentState, [event.target.name]: event.target.value })
  },
}

export { HelperFunction }
