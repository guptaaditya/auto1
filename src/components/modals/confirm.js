import React from 'react'
import { Modal, Button } from 'react-bootstrap'

export default function Confirm({title, body, progressButtonText, onProgress, show, handleClose}) {
  return (
    <Modal show={show} onHide={handleClose}>
        {title &&
        <Modal.Header>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        }

        <Modal.Body>{body}</Modal.Body>

        <Modal.Footer>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={onProgress} bsStyle="primary">{progressButtonText}</Button>
        </Modal.Footer>
    </Modal>
  )
}
