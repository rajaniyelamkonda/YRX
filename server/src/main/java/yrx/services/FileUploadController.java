package yrx.services;

import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.method.annotation.MvcUriComponentsBuilder;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/files")
public class FileUploadController {

    private final StorageService storageService;

    public FileUploadController() {
        this.storageService = new FileSystemStorageService();
    }

    @RequestMapping(method = RequestMethod.GET, produces = "application/json",consumes = "application/json")
    public List<String> listUploadedFiles(@RequestParam("id") String id) throws IOException {

        return storageService.loadAll(id).map(
                path -> MvcUriComponentsBuilder.fromMethodName(FileUploadController.class,
                        "serveFile", path.getFileName().toString(), id).build().toString())
                .collect(Collectors.toList());
    }

    @RequestMapping(value = "/{filename:.+}", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<Resource> serveFile(@PathVariable String filename, @RequestParam("id") String id) {

        Resource file = storageService.loadAsResource(filename, id);
        return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION,
                "attachment; filename=\"" + file.getFilename() + "\"").body(file);
    }

    @RequestMapping(method = RequestMethod.POST)
    public String handleFileUpload(@RequestParam("file") MultipartFile[] files,@RequestParam("id") java.lang.String id,
                                   RedirectAttributes redirectAttributes) {
        for(int i=0;i<files.length;i++) {
            storageService.store(files[i], id);
            redirectAttributes.addFlashAttribute("message",
                    "You successfully uploaded " + files[i].getOriginalFilename() + "!");
        }

        return "redirect:/";
    }
}