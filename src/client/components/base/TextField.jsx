import React from 'react'
import { TextField as MaterialTextField } from '@material-ui/core'

export const TextField = props => <MaterialTextField
	variant={'filled'}
	margin={'dense'}
	fullWidth
	{...props}
/>

TextField.propTypes = MaterialTextField.propTypes
