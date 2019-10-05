
import React from 'react'
import {NavBar,InputItem, TextareaItem, Button} from 'antd-mobile'
import AvatarSelector from '../../component/avatar-selector/avatar-selector'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {update} from '../../redux/user.redux'  

@connect(
	state=>state.user,
	{update}
)
class BossInfo extends React.Component{
	constructor(props) { // 构造函数
		super(props)
		this.state = { // 设置初识state
			title:'',
			desc:'',
			company:'',
			money:''
		}
	}
	onChange(key,val){ // 实现onChange函数
		this.setState({
			[key]:val
		})
	}
	render(){
		const path = this.props.location.pathname
		const redirect = this.props.redirectTo
		return (
			<div>
				{redirect&&redirect!==path? <Redirect to={this.props.redirectTo}></Redirect> :null}
				<NavBar mode="dark" >BOSS完善信息页</NavBar> 
				<AvatarSelector 
					selectAvatar={(imgname)=>{
						this.setState({
							avatar:imgname
						})
					}}
					// 第一个是tital key, 第二个是值v
				></AvatarSelector>
				<InputItem onChange={(v)=>this.onChange('title',v)}> 
					招聘职位
				</InputItem>
				<InputItem onChange={(v)=>this.onChange('company',v)}>
					公司名称
				</InputItem>
				<InputItem onChange={(v)=>this.onChange('money',v)}>
					职位薪资
				</InputItem>
				<TextareaItem
					onChange={(v)=>this.onChange('desc',v)}
					rows={3} // 一开始显示三行
					autoHeight // 自适应高度
					title='职位要求'
				>
					
				</TextareaItem>
				<Button 
					onClick={()=>{
						this.props.update(this.state)
					}}
					type='primary'>保存</Button>
			</div>
			
		)
	}
}

export default BossInfo