"use client";

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Wallet, Star, Shield, Zap, Contact } from "lucide-react"
import Image from "next/image"
import { ConnectButton, lightTheme, MediaRenderer, TransactionButton, useActiveAccount, useReadContract } from "thirdweb/react"
import { client } from "./client"
import { getContract } from "thirdweb"
import { sepolia } from "thirdweb/chains"
import { getContractMetadata } from "thirdweb/extensions/common"
import { claimTo } from "thirdweb/extensions/erc721";
import nftImage from '../asset/Small stylized piece of land in the air combined w.jpg';
import croppedImage from '../asset/cropped_image.png'; 

export default function NFTClaimLandingPage() {

  const account = useActiveAccount();


  const contract = getContract({
    client: client,
    chain: sepolia,
    address:"0x4121A401A87b4B630006b52CECe40cf2271aa368"
  })

  const {data: contractMetadata } = useReadContract(
    getContractMetadata,
    {
      contract: contract,
    }
  );

  console.log(contractMetadata);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-pink-100">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex-shrink-0 flex items-center">
              <span className="font-bold text-xl text-purple-600">NFTopia</span>
            </div>
            <div className="flex items-center">
              {/* <Button variant="outline" className="flex items-center">
                <Wallet className="mr-2 h-4 w-4" />
                Connect Wallet
              </Button> */}
              <ConnectButton client={client} theme={lightTheme()} connectButton={{
                label : "Connect Wallet",
              }}/>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <section className="flex flex-col md:flex-row items-center justify-between mb-16">
          <div className="md:w-1/2 mb-8 md:mb-0">
            {/* <Image
              src="/placeholder.svg?height=400&width=400"
              alt="NFT Preview"
              className="rounded-lg shadow-2xl"
              width={400}
              height={400}
            /> */}
            <MediaRenderer client={client}
            src={contractMetadata?.image}            
            width="400"
            height="400"
            style={{
              borderRadius: "1rem",
              border: "1px solid #e2e8f0",
              boxShadow: "0px 1px 2px 0px rgba(16, 24, 40 , 0.06)",
            }}
            />
          </div>
          <div className="md:w-1/2 md:pl-12">
            <h1 className="text-4xl font-bold mb-4 text-purple-800">{contractMetadata?.name}</h1>
            <p className="text-xl mb-6 text-gray-600">
              {contractMetadata?.description}
            </p>
            {/* <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
              Claim Your NFT
            </Button> */}
            <TransactionButton
            transaction={() => claimTo({
              contract: contract,
              to: account?.address as string,
              quantity: BigInt(1),
            })}
            onTransactionConfirmed={async () => alert("Transaction Confirmed")}
            >
              Claim 1 NFT
            </TransactionButton>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-6 text-center text-purple-800">About This NFT</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>The Artwork</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                <Image
                   src={nftImage}
                  alt="NFT Artwork"
                  width={200}
                  height={100}
                  className="rounded-lg mb-4 border-4 border-violet-200"
                  
                />
                <p>
                  This NFT is part of a limited edition series, featuring stunning digital artwork that blends abstract
                  forms with vibrant colors. Each piece is unique and represents the convergence of art and technology.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>The Creator</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                <Image
                  src={croppedImage}
                  alt="Creator Portrait"
                  width={200}
                  height={200}
                  
                  className="rounded-full mb-4 border-4 border-violet-200"
                />
                <p>
                  Created by renowned digital artist Dharanivel's, this NFT collection showcases years of expertise in
                  digital manipulation and blockchain technology.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-semibold mb-6 text-center text-purple-800">Holder Benefits</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Star className="mr-2 h-5 w-5 text-yellow-500" />
                  Exclusive Access
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Get VIP access to virtual gallery openings and exclusive online events with the artist.
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="mr-2 h-5 w-5 text-green-500" />
                  Community Membership
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Join a vibrant community of collectors and art enthusiasts. Participate in discussions and
                  collaborations.
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="mr-2 h-5 w-5 text-purple-500" />
                  Future Drops
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Get priority access and discounts on future NFT drops from the artist and associated collections.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <footer className="bg-purple-800 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2024 NFTopia. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

