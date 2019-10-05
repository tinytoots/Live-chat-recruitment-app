import React from 'react' // 引入react第三方库的文件,这一行必不可少
import { connect } from 'react-redux'
import { addGun, removeGun, addGunAsync } from './index.redux'

@connect(
	// 你要state什么属性放到props里
	state=>({num:state.counter}),
	// 你要什么方法，放到props里，自动dispatch
	{ addGun, removeGun, addGunAsync }
)
class App extends React.Component{ // 只要是组件都需要使用class语法,extents之后这个类就变成了一个组件
	render(){ // 在组件内部使用render函数作为返回函数
		return (
			<div>
				<h1>现在有机枪{this.props.num}把</h1>
				<button onClick={this.props.addGun}>申请武器</button>				
				<button onClick={this.props.removeGun}>上交武器</button>				
				<button onClick={this.props.addGunAsync}>拖两天再给</button>				
			</div>
		)
	}
}


export default App	 //* 文件写完之后export对外输出 */