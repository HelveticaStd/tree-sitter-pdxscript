package tree_sitter_pdxscript_test

import (
	"testing"

	tree_sitter "github.com/tree-sitter/go-tree-sitter"
	tree_sitter_pdxscript "github.com/tree-sitter/tree-sitter-pdxscript/bindings/go"
)

func TestCanLoadGrammar(t *testing.T) {
	language := tree_sitter.NewLanguage(tree_sitter_pdxscript.Language())
	if language == nil {
		t.Errorf("Error loading PdxScript grammar")
	}
}
