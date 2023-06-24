package com.mkm.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.mkm.models.Usertest;

@Repository
public interface UsertestRepository extends JpaRepository <Usertest, Integer> {
	
}
