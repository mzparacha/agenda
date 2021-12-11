import { Modal, Form, Input, Button } from 'antd'
import React, { FC } from 'react'
import { v4 as uuidv4 } from 'uuid'

const AgendaForm: FC<any> = props => {
  const {
    addModalVisible,
    setAddModalVisible,
    addAgenda,
    edit,
    setEditData,
    editAgenda
  } = props
  const [form] = Form.useForm()

  const handleCancel = () => {
    form.resetFields()
    setAddModalVisible(false)
    setEditData(null)
  }
  const Submit = (values: any) => {
    if (edit) {
      setAddModalVisible(false)
      form.resetFields()
      setEditData(null)
      const now = new Date().toISOString()
      editAgenda({
        ...values,
        id: edit.id,
        createdAt: edit.createdAt,
        updatedAt: now
      })
    } else {
      setAddModalVisible(false)
      form.resetFields()
      setEditData(null)
      const id = uuidv4()
      const createdAt = new Date().toISOString()
      addAgenda({ ...values, id, createdAt, updatedAt: createdAt })
    }
  }

  if (edit) {
    form.setFieldsValue({ title: edit.title })
    form.setFieldsValue({ description: edit.description })
    form.setFieldsValue({ status: edit.status })
    form.setFieldsValue({ date: edit.date })
  }

  return (
    <div>
      <Modal
        title={edit ? 'Edit Agenda' : 'Add Agenda'}
        visible={addModalVisible}
        footer={[]}
        onCancel={() => handleCancel()}
      >
        <Form form={form} onFinish={Submit}>
          <div>
            <label>Title</label>
            <Form.Item
              name='title'
              rules={[
                {
                  required: true,
                  message: 'Please input title!'
                }
              ]}
            >
              <Input
                className='form-control'
                type='text'
                placeholder='Title'
              />
            </Form.Item>
          </div>
          <div>
            <label>Description</label>
            <Form.Item
              name='description'
              rules={[
                {
                  required: true,
                  message: 'Please input description!'
                }
              ]}
            >
              <Input
                className='form-control'
                type='text'
                placeholder='Description'
              />
            </Form.Item>
          </div>
          <div>
            <label>Status</label>
            <Form.Item
              name='status'
              rules={[
                {
                  required: true,
                  message: 'Please input status!'
                }
              ]}
            >
              <Input
                className='form-control'
                type='text'
                placeholder='Status'
              />
            </Form.Item>
          </div>
          <div>
            <label>Date</label>
            <Form.Item
              name='date'
              rules={[
                {
                  required: true,
                  message: 'Please input date!'
                }
              ]}
            >
              <Input
                className='form-control'
                type='text'
                placeholder='Date'
              />
            </Form.Item>
          </div>
          <Form.Item>
            <Button type='primary' htmlType='submit'>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export { AgendaForm }
