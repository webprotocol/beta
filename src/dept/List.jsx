import React from "react";
import { Link } from "react-router-dom";
import withRouter from "./withRouter";

class List extends React.Component {
	
	constructor() {
		super();
	}
	
	componentDidMount() {
		this.init();
		console.log("List.componentDidMount...");
	}
	
	async init() {
		let response = await fetch("/rest/dept");
		let json = await response.json();
		
		if (response.ok) {		
			this.state.error = false;
			this.state.data = json.data;
		} else {
 			this.state.message = json.message;
		}
		this.forceUpdate();
		
		console.log(json);
	}
	
	state = {
		error: true,
		message: "로딩중...",
		data : {},
	}
	
	render() {
		if (this.state.error)
			return <h1>{this.state.message}</h1>
		else
			return ( 
				<>
				<h1>부서 목록</h1>
				<hr/>
				<Link to="insert">추가</Link>
				<table style={{borderCollapse: "collapse"}} border={1} width={500}>
					<thead>
						<tr>
							<th>deptno</th>
							<th>dname</th>
							<th>loc</th>
							<th>수정</th>
							<th>삭제</th>
						</tr>
					</thead>
					<tbody>
						{
							this.state.data.map(dept => 
							<tr key={dept.deptno}>
								<td>{dept.deptno}</td>
								<td>{dept.dname}</td>
								<td>{dept.loc}</td>
								<td><Link to="update" state={{dept: dept}}>수정</Link></td>
								<td><Link to="delete" state={{dept: dept}}>삭제</Link></td>
							</tr>
						)}
					</tbody>	
				</table>
				</>
			)
	}
	
}

export default withRouter(List);