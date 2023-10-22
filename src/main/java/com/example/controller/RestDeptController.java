package com.example.controller;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.mapper.DeptMapper;
import com.example.model.Dept;

import jakarta.servlet.http.HttpServletRequest;

@Controller
@RequestMapping("/rest/dept")
public class RestDeptController {
	
	@Autowired
	DeptMapper mapper;
	
	@GetMapping(headers = {"Accept=text/html"})
	void list() {
		
	}
	
	@GetMapping
	@ResponseBody
	ResponseEntity<Object> get(HttpServletRequest request) {

		var list = mapper.selectAll();
		
		var body = new HashMap<String, Object>();
		body.put("result", "success");
		body.put("data", list);
		
		return new ResponseEntity<Object>(body, HttpStatus.OK);
	}
	
	@PostMapping
	@ResponseBody
	ResponseEntity<Object> post(@RequestBody Dept dept) {
		System.out.println(dept);
		System.out.println("post...");
		
		ResponseEntity<Object> response = null;
		HashMap<String, Object> body = new HashMap<String, Object>();
		
		try {
			mapper.insert(dept);
			body.put("result", "success");
			body.put("data", dept);
			
			response = new ResponseEntity<Object>(body, HttpStatus.OK);
		} catch (DuplicateKeyException e) {
			body.put("result", "error");
			body.put("message", "존재하는 부서입니다.");
			response = new ResponseEntity<Object>(body, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		return response;
	}
	
	@PutMapping
	@ResponseBody
	ResponseEntity<Object> put(@RequestBody Dept dept) {
		ResponseEntity<Object> response = null;
		HashMap<String, Object> body = new HashMap<String, Object>();
		
		try {
			mapper.update(dept);
			body.put("result", "success");
			body.put("data", dept);
			response = new ResponseEntity<Object>(body, HttpStatus.OK);
		} catch (Exception e) {
			body.put("result", "error");
			body.put("message", "서버 에러입니다.");
			response = new ResponseEntity<Object>(body, HttpStatus.INTERNAL_SERVER_ERROR);
			e.printStackTrace();
			System.out.println(e.getClass().getName());
		}
		
		return response;
	}
	
	@DeleteMapping
	@ResponseBody
	ResponseEntity<Object> delete(@RequestBody Dept dept) {
		ResponseEntity<Object> response = null;
		HashMap<String, Object> body = new HashMap<String, Object>();
		
		try {
			mapper.delete(dept);
			body.put("result", "success");
			body.put("data", dept);
			response = new ResponseEntity<Object>(body, HttpStatus.OK);
		} catch (DataIntegrityViolationException e) {
			body.put("result", "error");
			body.put("message", "사원이 소속된 부서는 삭제할 수 없습니다.");
			response = new ResponseEntity<Object>(body, HttpStatus.INTERNAL_SERVER_ERROR);
			e.printStackTrace();
			System.out.println(e.getClass().getName());
		}
		
		return response;
	}
}
