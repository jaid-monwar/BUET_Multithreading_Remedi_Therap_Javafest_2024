package com.ollama.springai.controller;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import com.ollama.springai.records.Payload;
import com.ollama.springai.service.OllamaChatGenerator;

import java.util.Map;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin(origins = "http://localhost:3001")
public class OllamaChatController {

    private final OllamaChatGenerator ollamaChatGenerator;

    public OllamaChatController(OllamaChatGenerator ollamaChatGenerator) {
        this.ollamaChatGenerator = ollamaChatGenerator;
    }

    @PostMapping(value = "/chat", produces = MediaType.APPLICATION_JSON_VALUE)
    public Map chat(@RequestBody Payload payload){
        return this.ollamaChatGenerator.generate(payload.strings());
    }
}