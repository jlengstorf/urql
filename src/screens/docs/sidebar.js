import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { withRouteData, withRouter, Link } from "react-static";
import {
  SidebarNavItem,
  SidebarNavSubItem,
  SidebarContainer
} from "../../components/navigation";

const HeroLogo = styled.img`
  position: absolute;
  top: 2rem;
  left: 4rem;
  min-width: 14rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  margin-top: 1rem;
  height: auto;
`;

const SubContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
`;

const Wrapper = styled.div`
  display: inline-block;
`;

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.handleMenuOpen = this.handleMenuOpen.bind(this);
    this.updateWidth = this.updateWidth.bind(this);
    this.state = { openSidebar: false, windowWidth: window.outerWidth };
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateWidth);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWidth);
  }

  updateWidth() {
    this.setState({ windowWidth: window.outerWidth });
  }

  handleMenuOpen() {
    this.setState({ openSidebar: true });
  }

  renderSidebarItem(item) {
    const { tocArray } = this.props;
    const currentPath = `/docs${item.path}` === window.location.pathname;
    const subContent = tocArray.filter(toc => toc.level === 2);

    return (
      <Wrapper key={item.path}>
        <SidebarNavItem
          to={`/docs${item.path}`}
          replace
          key={item.title.split(" ").join("_")}
        >
          {item.title}
        </SidebarNavItem>
        {currentPath && subContent && (
          <SubContentWrapper>
            {subContent.map(sh => (
              <SidebarNavSubItem
                to={`#${sh.content
                  .split(" ")
                  .join("-")
                  .toLowerCase()}`}
                // onClick={() =>
                //   this.setState({ openSidebar: !this.state.openSidebar })
                // }
                key={sh.content.split(" ").join("_")}
              >
                {sh.content}
              </SidebarNavSubItem>
            ))}
          </SubContentWrapper>
        )}
      </Wrapper>
    );
  }

  render() {
    const { sidebarHeaders } = this.props;
    return (
      <SidebarContainer>
        <Link to={"/"}>
          <HeroLogo
            src="../../static/svgs/logo-sidebar.svg"
            alt="Formidable Logo"
          />
        </Link>
        <ContentWrapper>
          {sidebarHeaders &&
            sidebarHeaders.map(sh => this.renderSidebarItem(sh))}
        </ContentWrapper>
      </SidebarContainer>
    );
  }
}

Sidebar.propTypes = {
  sidebarHeaders: PropTypes.array,
  tocArray: PropTypes.array
};

export default withRouter(withRouteData(Sidebar));
