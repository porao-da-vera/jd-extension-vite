import React from 'react'
import Button from "./Button"

import { ListWarningWrapper, ListWarningContent } from './ListWarning.styled'

const ListWarning = ({ children, buttonLabel, onClick }) => {
    return (
        <ListWarningWrapper>
            <ListWarningContent>
                {children}
                {buttonLabel && <Button onClick={onClick}>{buttonLabel}</Button>}
            </ListWarningContent>

        </ListWarningWrapper>
    )
}

export default ListWarning
