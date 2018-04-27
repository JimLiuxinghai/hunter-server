import React from 'react'
import ReactDOM from 'react-dom'
import { Layout, Menu, Breadcrumb } from 'antd'
import { errorList, errorByTime, errorUser } from '../api/index.js'
import 'antd/lib/layout/style/css'
import '../common/common.less'
import ScreenBox from '../components/index/screen-box'
import Charts from '../components/index/chart'
import datetime  from '../utils/datetime.js'
const { Content, Footer } = Layout

class App extends React.Component {
    state = {
        timeData: [],
        users: 0,
        pages: 0,
        project: 0,
        type: '1'

    }
    async componentDidMount () {
        this.getData()
        
    }
    async getData (time) {
        let timeArr = time || this.dealTime(this.state.type)
        let timeParam = {
            timeType: 1,
            startTime: timeArr[0],
            endTime: timeArr[1]
        }
        let userParam = {}
        let timeData = await errorByTime(timeParam)
        let userData = await errorUser()
        
        this.setState({
            timeData: timeData.data,
            users: userData.data.users,
            pages: userData.data.pages,
            project: userData.data.project,
        })
    }
    dealTime = (type, time) => {
        let endTime = datetime.format(new Date())
        let startTime = ''
        switch (type) {
            case '1': 
                startTime = datetime.switch(endTime, 7)
                break;
            case '2':
                startTime = datetime.switch(endTime, 30);
                break;
            case '3':
                endTime = time[1];
                startTime = time[0];
                break;
        }
        return [startTime, endTime]
        
    }
    
    timeChange = (time) => {
        this.getData(time)
    }
    switchType = (type, time) => {
        let timeArr = this.dealTime(type, time)
        this.getData(timeArr)
        this.setState({
            type: type
        })
    }
    computeUsers = (list) => {
        let users = []
        list.forEach((item) => {
            if(users.indexOf(item.currentIp) == -1) {
                users.push(item.currentIp)
            }
        })
        return users.length
    } 
    render() {
        return (
            <Layout>
              <Breadcrumb>
                <Breadcrumb.Item>概览</Breadcrumb.Item>
              </Breadcrumb>
              <div className="main-content">
                  <ScreenBox selectType= { this.state.type } switchTime={ this.switchType }></ScreenBox>
                  <Charts timeData={this.state.timeData} user={this.state.users} project={this.state.project} pages={this.state.pages}/>
              </div>
            </Layout>
            
        )
    }
}


export default App