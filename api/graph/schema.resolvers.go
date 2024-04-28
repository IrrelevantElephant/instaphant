package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.
// Code generated by github.com/99designs/gqlgen version v0.17.45

import (
	"context"
	"fmt"
	"strings"

	"github.com/IrrelevantElephant/instaphant/api/graph/model"
	"github.com/google/uuid"
)

// UpsertPost is the resolver for the upsertPost field.
func (r *mutationResolver) UpsertPost(ctx context.Context, input model.PostInput) (*model.Post, error) {
	id := strings.Replace(uuid.NewString(), "-", "", -1)
	var post model.Post
	post.Author = &model.User{
		ID:   strings.Replace(uuid.NewString(), "-", "", -1),
		Name: *input.Author,
	}
	post.ID = id
	post.Description = *input.Description
	post.Image = *input.Image

	n := len(r.Resolver.PostStore)
	if n == 0 {
		r.Resolver.PostStore = make(map[string]model.Post)
	}

	r.Resolver.PostStore[post.ID] = post
	return &post, nil
}

// Posts is the resolver for the posts field.
func (r *queryResolver) Posts(ctx context.Context) ([]*model.Post, error) {
	panic(fmt.Errorf("not implemented: Posts - posts"))
}

// Users is the resolver for the users field.
func (r *queryResolver) Users(ctx context.Context) ([]*model.User, error) {
	panic(fmt.Errorf("not implemented: Users - users"))
}

// Comments is the resolver for the comments field.
func (r *queryResolver) Comments(ctx context.Context) ([]*model.Comment, error) {
	panic(fmt.Errorf("not implemented: Comments - comments"))
}

// Mutation returns MutationResolver implementation.
func (r *Resolver) Mutation() MutationResolver { return &mutationResolver{r} }

// Query returns QueryResolver implementation.
func (r *Resolver) Query() QueryResolver { return &queryResolver{r} }

type mutationResolver struct{ *Resolver }
type queryResolver struct{ *Resolver }
