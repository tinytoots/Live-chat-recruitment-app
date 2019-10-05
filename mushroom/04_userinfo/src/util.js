 

export function getRedirectPath({type, avatar}){
	// 根据用户信息 返回跳转地址.现在基本页面分四个:根据用户的状态,如果用户名user.type分别跳到boss和genius,用户是否有头像跳到bossinfo和geniusinfo
	// user.type /boss /genius
	// user.avatar /bossinfo /geniusinfo 
	let url = (type==='boss')?'/boss': '/genius'
	if (!avatar) { // 是否有头像,如果有说明信息完善了
		url += 'info'
	}
	return url
}
