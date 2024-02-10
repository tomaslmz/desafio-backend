### GET Produto
```
  /api/v1/produto/create
```
```json
{
	"codigo_barras": "string",
	"descricao": "string",
	"caracteristicas": "string",
	"preco": "number",
	"unidade_medida": "string",
	"categoria_id": "number"
}
```

### PATCH Produto
```
  /api/v1/produto/update/:id
```
```json
{
	"codigo_barras": "string",
	"descricao": "string",
	"caracteristicas": "string",
	"preco": "number",
	"unidade_medida": "string",
	"categoria_id": "number"
}
```

### GET Produto
```
  /api/v1/produto/list
```

### GET Produto
```
  /api/v1/produto/search/:id
```

### DELETE Produto
```
  /api/v1/produto/delete/:id
```