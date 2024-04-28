package graph

import "github.com/IrrelevantElephant/instaphant/api/graph/model"

// This file will not be regenerated automatically.
//
// It serves as dependency injection for your app, add any dependencies you require here.

type Resolver struct {
	PostStore map[string]model.Post
}
