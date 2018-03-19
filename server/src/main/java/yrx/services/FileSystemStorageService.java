package yrx.services;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.util.FileSystemUtils;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.stream.Stream;

public class FileSystemStorageService implements StorageService {

    private final Path rootLocation;

    public FileSystemStorageService() {
        this.rootLocation = Paths.get("C:\\Learning\\yrx1\\src\\main\\resources\\images");
        System.out.println(rootLocation);
    }

    @Override
    public void store(MultipartFile file, String id) {
        String filename = StringUtils.cleanPath(file.getOriginalFilename());
        Path location = this.rootLocation.resolve(id);
        init(id);
        try {
            if (file.isEmpty()) {
                throw new RuntimeException("Failed to store empty file " + filename);
            }
            if (filename.contains("..")) {
                // This is a security check
                throw new RuntimeException(
                        "Cannot store file with relative path outside current directory "
                                + filename);
            }
            Files.copy(file.getInputStream(), location.resolve(filename),
                    StandardCopyOption.REPLACE_EXISTING);
        }
        catch (IOException e) {
            throw new RuntimeException("Failed to store file " + filename, e);
        }
    }

    @Override
    public Stream<Path> loadAll(String id) {
        Path location = this.rootLocation.resolve(id);
        try {
            return Files.walk(location, 1)
                    .filter(path -> !path.equals(location))
                    .map(path -> location.relativize(path));
        }
        catch (IOException e) {
            throw new RuntimeException("Failed to read stored files", e);
        }

    }

    @Override
    public Path load(String filename, String id) {
        return rootLocation.resolve(id).resolve(filename);
    }

    @Override
    public Resource loadAsResource(String filename, String id) {
        try {
            Path file = load(filename, id);
            Resource resource = new UrlResource(file.toUri());
            if (resource.exists() || resource.isReadable()) {
                return resource;
            }
            else {
                throw new RuntimeException(
                        "Could not read file: " + filename);

            }
        }
        catch (MalformedURLException e) {
            throw new RuntimeException("Could not read file: " + filename, e);
        }
    }

    @Override
    public void deleteAll(String id) {
        FileSystemUtils.deleteRecursively(rootLocation.resolve(id).toFile());
    }

    @Override
    public void init(String id) {
        try {
            Files.createDirectories(rootLocation.resolve(id));
        }
        catch (IOException e) {
            throw new RuntimeException("Could not initialize storage", e);
        }
    }
}
