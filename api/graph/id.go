package graph

import (
	"encoding/base64"
	"math/big"
	"math/rand"
	"strings"
)

func newId() string {
	r := rand.Uint64()
	b := big.NewInt(int64(r)).Bytes()
	encoded := base64.RawStdEncoding.Strict().EncodeToString(b)
	var replacer = strings.NewReplacer(
		"+", "-",
		"/", "_",
	)
	return replacer.Replace(encoded)
}
