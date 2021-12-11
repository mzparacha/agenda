import React, { useState } from 'react'
import { Table, Tag, Space, Layout, Menu, Dropdown } from 'antd'
import { AgendaForm } from '../components'
import { CSVDownloader, CSVReader } from 'react-papaparse'

const { Header, Footer } = Layout

const data = [
  {
    id: '1',
    title: 'John Brown',
    description: '32',
    status: 'Active',
    date: '836423',
    createdAt: '836423',
    updatedAt: '836423'
  },
  {
    id: '2',
    title: 'John Brown',
    description: '32',
    status: 'Active',
    date: '836423',
    createdAt: '836423',
    updatedAt: '836423'
  },
  {
    id: '3',
    title: 'John Brown',
    description: '32',
    status: 'Active',
    date: '836423',
    createdAt: '836423',
    updatedAt: '836423'
  },
  {
    id: '4',
    title: 'John Brown',
    description: '32',
    status: 'Active',
    date: '836423',
    createdAt: '836423',
    updatedAt: '836423'
  }
]

const Homepage = () => {
  const [agenda, setAgenda] = useState<any>(data)
  const [editData, setEditData] = useState<any>()
  const [addModalVisible, setAddModalVisible] = useState(false)

  const actions = (record: any) => (
    <Menu>
      <Menu.Item id='1' onClick={() => handleEdit(record)}>
        Edit
      </Menu.Item>
      <Menu.Item id='2' onClick={() => Delete(record?.id)}>
        Delete
      </Menu.Item>
    </Menu>
  )

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      id: 'title',
      render: (text: any) => <p>{text}</p>
    },
    {
      title: 'Description',
      dataIndex: 'description',
      id: 'description',
      render: (text: any) => <p>{text}</p>
    },
    {
      title: 'Status',
      id: 'status',
      dataIndex: 'status',
      render: (status: any) => (
        <Tag
          color={status === 'Active' ? 'green' : 'red'}
          id={'Active'}
        >
          {status}
        </Tag>
      )
    },
    {
      title: 'Date',
      id: 'date',
      dataIndex: 'date',
      render: (text: any) => <p>{text}</p>
    },

    {
      title: 'CreatedAt',
      id: 'createdAt',
      dataIndex: 'createdAt',
      render: (text: any) => <p>{text}</p>
    },
    {
      title: 'UpdatedAt',
      id: 'updatedAt',
      dataIndex: 'updatedAt',
      render: (text: any) => <p>{text}</p>
    },
    {
      title: 'Action',
      id: 'action',
      render: (text: any, record: any) => (
        <Space size='middle'>
          <Dropdown.Button
            overlay={() => actions(record)}
          ></Dropdown.Button>
        </Space>
      )
    }
  ]

  const Add = (newAgenda: any) => {
    setAgenda([...agenda, newAgenda])
  }

  const Delete = (id: any) => {
    let dummy = agenda.filter((item: any) => item.id !== id)
    setAgenda(dummy)
  }

  const handleEdit = (data: any) => {
    setEditData(data)
    setAddModalVisible(true)
  }

  const Edit = (updatedAgenda: any) => {
    let dummy = agenda.map((item: any) => {
      if (item.id !== updatedAgenda.id) {
        return item
      } else {
        return updatedAgenda
      }
    })
    setAgenda(dummy)
  }

  const handleOnFileLoad = (data: any) => {
    let dummy: any[] = []
    let header = data[0].data
    data.map((item: any, index: any) => {
      if (index !== 0) {
        let obj: any = {}
        item.data.map((element: any, index: any) => {
          let key = header[index]
          obj[key] = element
        })
        dummy.push(obj)
      }
    })
    setAgenda(dummy)
  }

  const handleOnRemoveFile = () => {
    setAgenda(data)
  }

  return (
    <Layout className='layout'>
      <Header>
        <Menu
          theme='dark'
          mode='horizontal'
          defaultSelectedKeys={['2']}
        >
          <Menu.Item
            style={{ textAlign: 'left', fontSize: '20px' }}
            id={'home'}
          >
            Home
          </Menu.Item>
          <Menu.Item
            id={'add'}
            onClick={() => setAddModalVisible(true)}
          >
            Add
          </Menu.Item>
          <Menu.Item id={'export_agenda'}>
            <CSVDownloader
              data={agenda}
              // type='button'
              filename={'filename'}
              bom={true}
              config={{}}
            >
              Export
            </CSVDownloader>
          </Menu.Item>
        </Menu>
      </Header>
      <div style={{ padding: '30px' }}>
        <CSVReader
          onDrop={handleOnFileLoad}
          onError={e => console.log('error', e)}
          addRemoveButton
          onRemoveFile={handleOnRemoveFile}
        >
          <span>Drop CSV file here or click to Import.</span>
        </CSVReader>
        <Table columns={columns} dataSource={agenda} />
      </div>
      <AgendaForm
        addModalVisible={addModalVisible}
        setAddModalVisible={setAddModalVisible}
        addAgenda={Add}
        edit={editData}
        setEditData={setEditData}
        editAgenda={Edit}
      />
      <Footer
        style={{
          bottom: '0',
          textAlign: 'center'
        }}
      >
        Agenda App
      </Footer>
    </Layout>
  )
}

export { Homepage }
