<template>
  <div class="markdown-rendered markdown-body" v-html="renderedMarkdown">
  </div>
</template>

<style lang="less">
.markdown-body {
  box-sizing: border-box;
  min-width: 200px;
  max-width: 980px;
  margin: 0 auto;
  padding: 45px;
}

.markdown-body > table > tbody > tr > td {
  border: 10px;
}

@media (max-width: 767px) {
  .markdown-body {
    padding: 15px;
  }
}
</style>

<script>
import MarkdownIt from "markdown-it";
import emoji from "markdown-it-emoji";
import subscript from "markdown-it-sub";
import superscript from "markdown-it-sup";
import footnote from "markdown-it-footnote";
import deflist from "markdown-it-deflist";
import abbreviation from "markdown-it-abbr";
import insert from "markdown-it-ins";
import mark from "markdown-it-mark";
// import toc from "markdown-it-toc-and-anchor";
import katex from "markdown-it-katex";
import tasklists from "markdown-it-task-lists";
import markdownithighlightjs from "markdown-it-highlightjs";

export default {
  md: new MarkdownIt(),
  data() {
    return {
      m_source: this.source
    };
  },
  props: {
    source: {
      type: String,
      default: ""
    }
  },
  computed: {
    renderedMarkdown() {
      var md = MarkdownIt({
        html: true,
        breaks: true,
        linkify: true,
        typographer: true
      })
        .use(subscript)
        .use(superscript)
        .use(footnote)
        .use(deflist)
        .use(abbreviation)
        .use(insert)
        .use(mark)
        .use(katex, { throwOnError: false, errorColor: " #cc0000" })
        .use(tasklists, { enabled: this.taskLists })
        .use(emoji)
        .use(markdownithighlightjs);
      return md.render(this.m_source || "### nothing");
    }
  },
  render(createElement) {
    console.log("rendered ");
    let outHtml = this.md.render(this.m_source);
    return createElement("div", {
      domProps: {
        innerHTML: outHtml
      }
    });
  },
  beforeMount() {
    if (this.$slots.default) {
      this.m_source = "";
      for (let slot of this.$slots.default) {
        this.m_source += slot.text;
      }
    }
    this.$watch("source", () => {
      this.m_source = this.source;
      this.$forceUpdate();
    });
  }
};
</script>
