<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="jakarta.tags.core"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>login.jsp</title>
<style type="text/css">
section {
	margin: auto;
	width: 50%
}

.error {
	margin: 10px;
	color: red;
}

.logout {
	margin: 10px;
	color: green;
}

fieldset {
	border: 1px solid black;
	margin: 20px 0px;
}
</style>
</head>
<body>
	<section>
		<h1>로그인</h1>
		<hr>
		<c:if test="${param.error == ''}">
			<div class="error">사용자ID 또는 비밀번호를 확인해 주세요.</div>
		</c:if>
		<c:if test="${param.logout == ''}">
			<div class="logout">로그아웃 되었습니다.</div>
		</c:if>
		<form action="/login" method="post">
			<fieldset>
				<legend>ID</legend>
				<input name="username">
			</fieldset>
			<fieldset>
				<legend>Password</legend>
				<input name="password">
			</fieldset>
			<fieldset>
				<input type="submit" value="Login">
			</fieldset>
		</form>
	</section>

</body>
</html>