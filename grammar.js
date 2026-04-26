/**
 * @file Pdxscript grammar for tree-sitter
 * @author HelveticaStd
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

module.exports = grammar({
  name: "pdxscript",

  extras: ($) => [
    /\s+/,
    $.comment
  ],

  rules: {
    source_file: ($) => repeat($.pair),

    comment: (_) => token(seq("#", /.*/)),

    bool: (_) => choice("yes", "no"),

    number: (_) =>
      token(
        seq(
          optional('-'),
          /[0-9]+/,
          optional(seq(".", /[0-9]+/))
        )
      ),

    unquoted_string: ($) => token(/[^\s{}=<>!"#]+/),

    quoted_string: (_) => token(seq('"', /[^"]*/, '"')),

    color: ($) =>
      seq(
        choice("hsv360", "hsv"),
        "{",
        $.number,
        $.number,
        $.number,
        "}"
      ),

    pair: ($) =>
      prec(1,
        seq(
          field("key", $.unquoted_string),
          choice("!=", ">=", "<=", "=", ">", "<"),
          field("value", choice(
            $.bool,
            $.number,
            $.color,
            $.object,
            $.quoted_string,
            $.unquoted_string,
          ))
        )
      ),

    object: ($) => seq("{", repeat($.pair), "}"),
  },
});

