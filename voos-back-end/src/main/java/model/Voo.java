package model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import java.io.Serializable;

@Entity(name = "voo")
public class Voo implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotNull
    @Column(name = "origem")
    private String origem;

    @NotNull
    @Column(name = "destino")
    private String destino;

    @NotNull
    @Column(name = "data")
    private String data; // Formato: YYYY-MM-DD

    @NotNull
    @Column(name = "hora")
    private String hora; // Formato: HH:MM

    @NotNull
    @Column(name = "preco")
    private Double preco;

    // Construtores
    public Voo() {}

    public Voo(String origem, String destino, String data, String hora, Double preco) {
        this.origem = origem;
        this.destino = destino;
        this.data = data;
        this.hora = hora;
        this.preco = preco;
    }

    // Getters e Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getOrigem() {
        return origem;
    }

    public void setOrigem(String origem) {
        this.origem = origem;
    }

    public String getDestino() {
        return destino;
    }

    public void setDestino(String destino) {
        this.destino = destino;
    }

    public String getData() {
        return data;
    }

    public void setData(String data) {
        this.data = data;
    }

    public String getHora() {
        return hora;
    }

    public void setHora(String hora) {
        this.hora = hora;
    }

    public Double getPreco() {
        return preco;
    }

    public void setPreco(Double preco) {
        this.preco = preco;
    }
}
