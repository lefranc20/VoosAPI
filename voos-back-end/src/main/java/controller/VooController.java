package controller;

import java.util.List;
import java.util.Optional;
import model.Voo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;

import repositorios.VooRepositorio;

@RestController
@CrossOrigin(origins = "http://localhost:3000") // Permite o front-end no localhost:3000
public class VooController {
    @Autowired
    private VooRepositorio repositorio;

    @RequestMapping(value = "/voos", method = RequestMethod.GET)
    public List<Voo> buscarTodosVoos() {
        return repositorio.findAll();
    }

    @RequestMapping(value = "/voo", method = RequestMethod.POST)
    public Voo salvarVoo(@RequestBody Voo voo) {
        return repositorio.save(voo);
    }

    @RequestMapping(value = "/voo/{id}", method = RequestMethod.GET)
    public ResponseEntity<Voo> buscarVooPorId(@PathVariable(value = "id") long id) {
        Optional<Voo> voo = repositorio.findById(id);
        if (voo.isPresent()) {
            return new ResponseEntity<>(voo.get(), HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @RequestMapping(value = "/voo/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<Object> deletarVoo(@PathVariable(value = "id") long id) {
        Optional<Voo> voo = repositorio.findById(id);
        if (voo.isPresent()) {
            repositorio.delete(voo.get());
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @RequestMapping(value = "/voo/{id}", method = RequestMethod.PUT)
    public ResponseEntity<Voo> atualizarVoo(@PathVariable(value = "id") long id, @RequestBody Voo novoVoo) {
        Optional<Voo> vooExistente = repositorio.findById(id);
        if (vooExistente.isPresent()) {
            Voo vooAtualizado = vooExistente.get();
            vooAtualizado.setOrigem(novoVoo.getOrigem());
            vooAtualizado.setDestino(novoVoo.getDestino());
            vooAtualizado.setData(novoVoo.getData());
            vooAtualizado.setHora(novoVoo.getHora());
            vooAtualizado.setPreco(novoVoo.getPreco());
            repositorio.save(vooAtualizado);
            return new ResponseEntity<>(vooAtualizado, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
