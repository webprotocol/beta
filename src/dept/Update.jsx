import React from "react";
import { Link } from "react-router-dom";
import withRouter from "./withRouter";


class Update extends React.Component {
	constructor() {
		super();
	}
	
	componentDidMount() {
		console.log("Update.componentDidMount...")
		console.log(this.props.location);
		this.state.dept = this.props.location.state.dept;
		this.forceUpdate();
	}
	
	onChange(e) {
		this.state.dept[e.target.name] = e.target.value;
		this.forceUpdate();
		
	}
	
	async onSummit(e) {
		
		console.log("onSummit()...")
		e.preventDefault();
		
		this.state.disabled = "disabled";
		this.forceUpdate();
		
		let response = await fetch("/rest/dept", {
			method: 'PUT',
			headers: {
			    'Content-Type': 'application/json;charset=utf-8'
			},
			body: JSON.stringify({
				deptno : this.state.dept.deptno,
				dname  : this.state.dept.dname.trim(),
				loc	   : this.state.dept.loc.trim() == "" ? null : this.state.dept.loc
			})
		});

		if (response.ok) {
			console.log(response.ok)
			console.log(this.props.navigate);
			alert("부서 수정 성공!!");
			this.props.navigate("/rest/dept");
		} else {
			let json = response.json();
			alert("수정 실패!! " + json.message);
			this.state.disabled = "";
			this.forceUpdate();
		}
		
	}
	
	
	state = {
		dept : {
			deptno: 0,
			dname : "",
			loc: ""
		},
		disabled: "",
		
		error : {
			dname: "none",
		}
	}
	

	render() {
		return (
		<>
		<Link to="/rest/dept">List</Link>
		<h1>Update</h1>
		<form onSubmit={event => this.onSummit(event)}>
			<fieldset>
				<legend><label htmlFor="deptno">deptno</label></legend>
				<input id="deptno" name="deptno" type="text" disabled value={this.state.dept.deptno} onChange={event => this.onChange(event)}/>
			</fieldset>
			<fieldset>
				<legend><label htmlFor="dname">dname</label></legend>
				<input id="dname" name="dname" type="text" required maxLength={10} value={this.state.dept.dname} onChange={event => this.onChange(event)}/>
			<div style={{display: this.state.error.dname}}>필수 입력 항목입니다.</div>
			</fieldset>
			<fieldset>
				<legend><label htmlFor="loc">loc</label></legend>
				<input id="loc" name="loc" type="text" maxLength={10} value={this.state.dept.loc==null ? "" : this.state.dept.loc} onChange={event => this.onChange(event)}/>
			</fieldset>
			<fieldset>
				<input type="submit" value="부서 수정" disabled={this.state.disabled}/>
			</fieldset>
		</form>
		</>
		)
	}
}

export default withRouter(Update);


