import React from 'react'
import ReactDOM from 'react-dom'
import { Layout, Menu, Breadcrumb } from 'antd'
import SyntaxHighlighter from 'react-syntax-highlighter/prism';
import { xonokai } from 'react-syntax-highlighter/styles/prism';
import 'antd/lib/layout/style/css'
import '../common/common.less'
import Charts from './../components/charts/index.jsx'

const { Content, Footer } = Layout

class App extends React.Component {
  render() {
    const codeString = '(num) => num + 1';
    return (
      <Layout className="layout">
        <Content style={{ padding: '0 50px' }}>
          <Breadcrumb style={{ margin: '12px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
          </Breadcrumb>
         <SyntaxHighlighter language='javascript' style={xonokai}>
          {`
            const a = 1;
            d.script = 11;
            let ss = ss;
          `}
         </SyntaxHighlighter>
         <Charts />
        </Content>
        <FooterCommon />
      </Layout>
    )
  }
}


export default App