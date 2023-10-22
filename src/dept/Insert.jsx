import React from "react";
import { Link } from "react-router-dom";
import withRouter from "./withRouter";


class Insert extends React.Component {
	
	onChange(e) {
		this.state.dept[e.target.name] = e.target.value;
		this.forceUpdate();
	}
	
	async onSummit(e) {
		console.log("onSummit()...");
		
		e.preventDefault();
		
		let response = await fetch("/rest/dept", {
			method: 'POST',
			headers: {
			    'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				deptno : this.state.dept.deptno,
				dname  : this.state.dept.dname.trim(),
				loc	   : this.state.dept.loc.trim() == "" ? null : this.state.dept.loc
			})
		});
		
		console.log(response.ok);
		
		if (response.ok) {
			console.log(response.ok)
			console.log(this.props.navigate);
			alert("부서 추가 성공!! 부서 목록으로 이동합니다.");
			this.props.navigate("/rest/dept");
		} else {
			let error = await response.json();
			console.log(error);
			alert("추가 실패!! " + error.message);
			this.state.disabled = "";
			this.forceUpdate();
		}
		
	}

	state = {
		dept: {
			deptno: 50,
			dname : "xxx",
			loc: "yyy"
		}
	}
	
	render() {
		console.log("render...")
		return (
		<>
		<h1>부서 추가</h1>
		<Link to="/rest/dept">List</Link>
		<hr/>
		<form onSubmit={event => this.onSummit(event)}>
			<fieldset>
				<legend><label htmlFor="deptno">deptno</label></legend>
				<input id="deptno" name="deptno" type="number" required min={10} max={99} value={this.state.dept.deptno} onChange={event => this.onChange(event)}/>
			</fieldset>
			<fieldset>
				<legend><label htmlFor="dname">dname</label></legend>
				<input id="dname" name="dname" type="text" required maxLength={10} value={this.state.dept.dname} onChange={event => this.onChange(event)}/>
			</fieldset>
			<fieldset>
				<legend><label htmlFor="loc">loc</label></legend>
				<input id="loc" name="loc" type="text" maxLength={10} value={this.state.dept.loc} onChange={event => this.onChange(event)}/>
			</fieldset>
			<fieldset>
				<input type="submit" value="부서 생성"/>
			</fieldset>
		</form>
		</>
		)
	}
	
}

export default withRouter(Insert);



