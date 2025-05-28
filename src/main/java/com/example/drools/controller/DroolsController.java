package com.example.drools.controller;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@RestController
@RequestMapping("/api/drools")
public class DroolsController {

    private final Path rulesDir = Paths.get("src/main/resources/rules");

    @GetMapping("/files")
    public List<String> listFiles() throws IOException {
        try (Stream<Path> files = Files.list(rulesDir)) {
            return files
                    .filter(p -> p.toString().endsWith(".drl"))
                    .map(Path::getFileName)
                    .map(Path::toString)
                    .collect(Collectors.toList());
        }
    }

    @GetMapping("/files/{name}")
    public ResponseEntity<String> getFile(
            @PathVariable String name) throws IOException {
        Path file = rulesDir.resolve(name);
        if (!Files.exists(file)) {
            return ResponseEntity.notFound().build();
        }
        String content = Files.readString(file, StandardCharsets.UTF_8);
        return ResponseEntity.ok(content);
    }

    @PostMapping("/files/{name}")
    public ResponseEntity<Void> saveFile(
            @PathVariable String name,
            @RequestBody String newContent) throws IOException {
        Path file = rulesDir.resolve(name);
        if (!Files.exists(file)) {
            return ResponseEntity.notFound().build();
        }
        Files.writeString(file, newContent, StandardCharsets.UTF_8);
        return ResponseEntity.ok().build();
    }

}
