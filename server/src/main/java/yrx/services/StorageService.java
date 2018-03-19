package yrx.services;

import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Path;
import java.util.stream.Stream;

public interface StorageService {

    void init(String id);

    void store(MultipartFile file, String id);

    Stream<Path> loadAll(String id);

    Path load(String filename, String id);

    Resource loadAsResource(String filename, String id);

    void deleteAll(String id);

}