import React from "react";
import { Link } from "react-router-dom";
import withRouter from "./withRouter";


class Delete extends React.Component {
	
	componentDidMount() {
		this.state.dept = this.props.location.state.dept;
		this.forceUpdate();
	}
	
	async onSummit(e) {
		console.log("onSummit()...");
		
		e.preventDefault();
		
		let response = await fetch("/rest/dept", {
			method: 'DELETE',
			headers: {
			    'Content-Type': 'application/json'
			},
			body: JSON.stringify(this.state.dept),
		});
		
		console.log(response.ok);
		
		if (response.ok) {
			console.log(response.ok)
			console.log(this.props.navigate);
			alert("부서 삭제 성공!! 부서 목록 으로 이동합니다.");
			this.props.navigate("/rest/dept");
		} else {
			let error = await response.json();
			console.log(error);
			alert("삭제 실패!! " + error.message);
			this.state.disabled = "";
			this.forceUpdate();
		}
		
	}
	
	state = {
		dept: {
		}
	}
	
	render() {
		console.log("render...")
		return (
		<>
		<h1>부서 삭제</h1>
		<Link to="/rest/dept">List</Link>
		<hr/>
		<form onSubmit={event => this.onSummit(event)}>
			<fieldset>
				<legend><label htmlFor="deptno">deptno</label></legend>
				<input id="deptno" name="deptno" type="number" disabled value={this.state.dept.deptno}/>
			</fieldset>
			<fieldset>
				<legend><label htmlFor="dname">dname</label></legend>
				<input id="dname" name="dname" type="text" disabled value={this.state.dept.dname}/>
			</fieldset>
			<fieldset>
				<legend><label htmlFor="loc">loc</label></legend>
				<input id="loc" name="loc" type="text" disabled value={this.state.dept.loc}/>
			</fieldset>
			<fieldset>
				<input type="submit" value="부서 삭제"/>
			</fieldset>
		</form>
		</>
		)
	}
	
}

export default withRouter(Delete);



