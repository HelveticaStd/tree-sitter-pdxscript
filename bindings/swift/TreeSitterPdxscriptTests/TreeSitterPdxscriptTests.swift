import XCTest
import SwiftTreeSitter
import TreeSitterPdxscript

final class TreeSitterPdxscriptTests: XCTestCase {
    func testCanLoadGrammar() throws {
        let parser = Parser()
        let language = Language(language: tree_sitter_pdxscript())
        XCTAssertNoThrow(try parser.setLanguage(language),
                         "Error loading PdxScript grammar")
    }
}
